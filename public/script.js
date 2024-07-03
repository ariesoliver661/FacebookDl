  async function downloadVideo() {
    const videoUrl = document.getElementById('videoUrl').value.trim();
    const messageDiv = document.getElementById('message');

    if (!videoUrl) {
      messageDiv.innerText = 'PLEASE PROVIDE THE FACEBOOK URL TO PROCEED';
      return;
    }

    messageDiv.innerText = 'PLEASE WAIT THE VIDEO IS DOWNLOADING [ CHECK THE DOWNLOADS WHEN ITS DONE ]';

    try {
      const response = await fetch(`https://hoanghao.me/api/facebook/download?url=${encodeURIComponent(videoUrl)}`);
      const { data } = await response.json();

      if (!data || !data.video || !data.title) {
        throw new Error('Invalid response from the server. Contact AriesOliver');
      }

      const { video, title } = data;
      const randomString = Math.random().toString(36).substring(7);
      const videoResponse = await fetch(video);
      const videoBlob = await videoResponse.blob();
      const blobUrl = window.URL.createObjectURL(videoBlob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${title}_${randomString}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      messageDiv.innerText = 'DOWNLOAD COMPLETE';
    } catch (error) {
      messageDiv.innerText = `Error downloading the video: ${error}`;
      console.error(error);
    }
  }