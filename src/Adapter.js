class Adapter {

  static getVideos(url) {
    return fetch(url).then(r => r.json())
  }

  static getLocalVideoLikes(id) {
    return fetch(`http://localhost:3001/api/v1/videos/${id}/likes`).then(r => r.json())
  }

  static fetchPost(url, fetchBody) {
    const fetchParams = {
      method: "POST",
      headers: {
        "Accept": 'application/json',
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(fetchBody)
    }

    return fetch(url, fetchParams).then(response => response.json())
  }
}

export default Adapter
