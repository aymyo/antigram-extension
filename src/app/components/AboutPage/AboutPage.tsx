import { Component, createSignal } from "solid-js";

const AboutPage: Component = () => {
  return (
    <>
      <h2 class="text-xl mb-4">About Antigram</h2>
      <div>
        Antigram is a chrome extension that gives the user tools to fight back Instagram's addictive
        features. It was made on my free time with the objective of being able to check what were my
        friends up to, without falling into a black hole of meaningless content.
      </div>
      <br />
      <div>Antigram is free and it does not track you.</div>
    </>
  );
};

export { AboutPage };

/*

 <div>
      Holo
     
        <div class="ag-category">
          <p class="ag-manifesto" tabindex="0">
           
            <br />
            <br />
            
          </p>

          <h5 class="ag-h5">
            <i class="fa fa-handshake-o" aria-hidden="true"></i>
            Support
          </h5>

          <a class="ag-label ag-sup"> Tell a friend! </a>

          <a
            class="ag-label ag-sup"
            href="https://chrome.google.com/webstore/detail/antigram-explore-blocker/igbheapdmolhhmmklmkfjjjncmhihfjh?hl=es"
            target="_blank"
          >
            Leave a review on Chrome Store
            <i class="fa fa-external-link"></i>
          </a>

          <a
            class="ag-label ag-sup"
            href="https://github.com/aymyo/antigram-extension/issues"
            target="_blank"
          >
            Report bugs or make suggestions via Github
            <i class="fa fa-external-link"></i>
          </a>

          <a class="ag-label ag-sup" href="https://www.buymeacoffee.com/aymyo" target="_blank">
            Donate if you can &#60;3
            <i class="fa fa-external-link"></i>
          </a>
        </div>

        <button class="about-h5" id="settings_link">
          <i class="fa fa-cog" aria-hidden="true"></i>
          Back to Settings
          <i class="fa fa-external-link ag-about"></i>
        </button>

        <div class="ag-save" id="saved_text" tabindex="0">
          made by{" "}
          <a href="https://github.com/aymyo" target="_blank">
            aymyo
          </a>
          and
          <a href="https://github.com/aymyo/antigram-extension/graphs/contributors" target="_blank">
            contributors
          </a>
          .
        </div>
      </div>
    </div>
*/
