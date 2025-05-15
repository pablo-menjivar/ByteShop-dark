/*

No FUNCIONA AUN


*/
/*

No FUNCIONA AUN


*/
/*

No FUNCIONA AUN


*/


const useFetch =()=>
{

const SERVER_URL = 'http://localhost:4000/api/';

const fetchData = async (endPoint, form = null, action = null) => {  // Agrega el id a la URL si es PUT o DELETE
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
  };

  try {
    const PATH = new URL(SERVER_URL + endPoint);
    const RESPONSE = await fetch(PATH.href, OPTIONS);

    if (!RESPONSE.ok) {
      throw new Error(`HTTP error! status: ${RESPONSE.status}`);
    }

    const DATA = await RESPONSE.json();
    console.log('RESPONSE en fetch', DATA);
    return DATA;

  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

return { fetchData };
}

export default useFetch;