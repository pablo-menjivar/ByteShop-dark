const SERVER_URL = `http://localhost:4000/api`;

export const fetchData = async (endPoint, form = null, action = null) => {
  // Add id to the URL if it's a PUT or DELETE
  if ((action === 'PUT' || action === 'DELETE') && form?.id) {
    endPoint = `${endPoint}/${form.id}`;
  }
  const OPTIONS = {
    method: ['POST', 'PUT', 'DELETE'].includes(action) ? action : 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    ...(form && ['POST', 'PUT'].includes(action) && { body: JSON.stringify(form) })
  }
  try {
    const PATH = new URL(SERVER_URL + endPoint);
    const RESPONSE = await fetch(PATH.href, OPTIONS);

    if (!RESPONSE.ok) {
      throw new Error(`HTTP error! status: ${RESPONSE.status}`);
    }
    const DATA = await RESPONSE.json();
    // Optionally remove or comment out the next line in production
    console.log('RESPONSE', DATA);
    return DATA;

  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}