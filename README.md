# ![alt text][logo] Antigram - Reels and Explore blocker

Antigram is a browser extension that gives the user tools to fight back Instagram's addictive
features. It was made on my free time with the objective of being able to check what were my friends
up to without falling into a blackhole of meaningless content.

### ✨  Current features

- Block 'Reels' page
- Block 'Explore' page
- Block 'Stories' section and page
- Block 'Posts' feed
- Block 'Suggested followers' section
- Block 'Threads' links
- Hide the floating Messages popup and unread count in the browser tab title
- Only Stories mode: keep stories, the Instagram logo, and your profile on the home page; hide the feed, sidebar navigation, Messages popup, suggestions, and footer
  (also hides the tab unread count; temporarily overrides individual options without changing them)
- Redirect 'For You' feed to 'Following' to avoid suggested posts
  
Missing something? Leave me a [suggestion](https://github.com/aymyo/antigram-extension/issues)! ☀️

### 📀  Stack
To avoid a build process and make development easier, I've sticked to browser native functionalities and JS, HTML and CSS.

### ⏬  Set it up in your browser

Download it from the [Chrome Store](https://chrome.google.com/webstore/detail/antigram-explore-blocker/igbheapdmolhhmmklmkfjjjncmhihfjh "Chrome Store") or install it mmanually follwing the next steps:

1. Clone the repo, `git clone https://github.com/aymyo/antigram-extension.git` or download the zip.
2. Go to Google Chrome and click 'Customize' (the three-dot icon top-right corner)
3. Go to Extensions > Manage Extensions
4. Toggle 'Developer mode'
5. Click 'Load unpacked'
6. Select the 'source' folder in the `antigram-extension` project
7. Done!

After changing options, click **Save changes** and refresh Instagram to apply them.

#### Disclaimer
Instragam updates periodically its web version, potentially breaking some functionalities of the extension. If that happens, please ensure you are using the last version of Antigram, and if that's the case, open an [issue](https://github.com/aymyo/antigram-extension/issues) so I can fix it! 🛠️

### 💌 Support it
Antigram is free and open-source and will always be. If you found it useful, please consider [donating](https://ko-fi.com/aymyo) to make the mantainance and improvement possible :)

### 🤝 Contributing
If you want to contribute please feel free to do so by opening a PR. I will review it at some point (although I can't promise that happens soon!).

To start developing, do steps 1-7 and:
8. Open the terminal and change directory into the repo `cd antigram-extension`
11. Install the development packages with `yarn install`
12. Any change you make to the source folder will be automatically reflected if you refresh the extension.


##### ℹ️ Sources and recommendations

This extension is mostly inspired by Jord West's
[News Feed Eradicator](https://github.com/jordwest/news-feed-eradicator), which I recommend if you
are a Facebook user. Additionally, I also recommend
[DF Youtube](https://chrome.google.com/webstore/detail/df-tube-distraction-free/mjdepdfccjgcndkmemponafgioodelna)
to have a better experience using Youtube.


[logo]: https://github.com/aymyo/antigram-extension/blob/main/source/public/ag32.png "Antigram Logo"

