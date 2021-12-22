import { Button, Modal } from "antd";

function About() {

  function info() {
    Modal.info({
      title: 'News Feed',
      content: (
        <div>
          <p>This app allows you to search for articles based on some term or keyword. 
            Our sources are public and the full articles can be read on the publisher's website. 
          </p>
        </div>
      )
    });
  }

  return (
    <header>
      <span>
        <h1>
          News Feed
        </h1>
      </span>
      <span id='about-this-app'>
        <Button onClick={info}>
          About this app
        </Button>
      </span>
    </header>
  );
}

export default About;
