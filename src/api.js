export async function fetchImages(name) {
  const response = await fetch(
    `https://www.amiiboapi.com/api/amiibo/?character=${name}`
  );
  const data = await response.json();
  const urls = []
  for (const amiibo of data.amiibo){
    urls.push(amiibo.image)
  }

  return urls
}