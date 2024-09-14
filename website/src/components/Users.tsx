import React from "react";

const Users = () => {
  return (
    <article>
      <header>
        <h1>Who's using OC?</h1>
      </header>
      <p>
        OC is used by fast growing companies around the world to serve
        microfrontends at scale
      </p>
      <div className="logos">
        <a href="https://www.opentable.com/">
          <img src="/img/home/users/opentable.png" alt="OpenTable" />
        </a>
        <a href="https://www.skyscanner.net/">
          <img src="/img/home/users/skyscanner.png" alt="Skyscanner" />
        </a>
        <a href="https://www.chegg.com/">
          <img src="/img/home/users/chegg.png" alt="Chegg" />
        </a>
        <a href="https://oneadvanced.com/">
          <img src="/img/home/users/advanced.png" alt="Advanced" />
        </a>
        <a href="https://alvarium.io/">
          <img src="/img/home/users/alvarium.png" alt="Alvarium" />
        </a>
        <a href="https://www.guestline.com/">
          <img src="/img/home/users/guestline.png" alt="Alvarium" />
        </a>
        <a href="https://devitjobs.uk/">
          <img src="/img/home/users/devituk-rectangle.png" alt="DevITJobs" />
        </a>
      </div>
    </article>
  );
};

export default Users;
