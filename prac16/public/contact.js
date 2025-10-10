const form = document.getElementById('contactForm');
const status = document.getElementById('status');

function setStatus(text, isError) {
  status.textContent = text;
  status.className = isError ? 'error' : 'success';
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  setStatus('Sending...', false);

  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    subject: form.subject.value.trim(),
    message: form.message.value.trim()
  };

  // simple client-side validation
  if (!data.name || !data.email || !data.message) {
    return setStatus('Please fill required fields (name, email, message).', true);
  }

  try {
    const resp = await fetch('/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await resp.json();
    if (resp.ok && result.success) {
      setStatus(result.message || 'Message sent. Thank you!', false);
      form.reset();
    } else {
      setStatus(result.message || 'Failed to send message.', true);
    }
  } catch (err) {
    setStatus('Network error. Please try again later.', true);
  }
});
