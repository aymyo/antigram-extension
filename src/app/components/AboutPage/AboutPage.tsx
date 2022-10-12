import { Component } from "solid-js";

const AboutPage: Component = () => {
  return (
    <div>
      <h2 class="text-xl mb-4 font-semibold">About Antigram</h2>
      <div>
        With Antigram, you will be able to check what your friends are up to without falling into a
        black hole of distractions and meaningless content. <br />
        You can choose to block or show Instagram's functionalities instantly by using the toggle
        buttons in the extension's settings page. Instagram has been designed and optimized to make
        profit of your addiction.
      </div>
      <br />
      <div>
        We hope is that by using the Antigram extension along with uninstalling the app from our
        phones and following only accounts that we care about, we can have a healthy relationship
        with social media.
      </div>
      <br />
      <div>
        Antigram is free and it does not track you. It only uses the storage permission to save and
        update your settings.
      </div>
      <h2 class="text-xl my-4 font-semibold">Support us</h2>
      <div>
        Antigram is maintained and updated by only two developers in our free time. If you found
        this extension useful please consider helping us by doing any of the following things:
      </div>
      <ul class="list-disc pl-5 pt-4">
        <li>Share with your friends!</li>
        <li>
          Leave a review on the{" "}
          <ExternalLink
            label="Chrome Store"
            href="https://chrome.google.com/webstore/detail/antigram-explore-blocker/igbheapdmolhhmmklmkfjjjncmhihfjh?hl=es"
          />
          .
        </li>
        <li>
          Report or make suggestions{" "}
          <ExternalLink
            label="in Github"
            href="https://github.com/aymyo/antigram-extension/issues"
          />
          .
        </li>
        <li>
          And the least important, but just in case, you can also{" "}
          <ExternalLink label="donate" href="https://www.buymeacoffee.com/aymyo" />.
        </li>
      </ul>

      <div class="text-sm mt-8 text-center">
        Made by
        <ExternalLink label="aymyo" href="https://github.com/aymyo" className="mx-1" />
        and
        <ExternalLink label="marcsaga" href="https://github.com/marcsaga" className="mx-1" />
        from Barcelona.
        <br />
        Thanks
        <ExternalLink
          label="contributors"
          href="https://github.com/aymyo/antigram-extension/graphs/contributors"
          className="ml-1"
        />
        .
      </div>
    </div>
  );
};

export { AboutPage };

const ExternalLink: Component<{ href: string; label: string; className?: string }> = ({
  href,
  label,
  className
}) => {
  return (
    <a class={`underline ${className}`} href={href} target="_blank">
      {label}
    </a>
  );
};
