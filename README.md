# ![alt text][logo] Antigram Chrome Extension

Antigram is a chrome extension that gives the user tools to fight back Instagram's addictive
features. It was made on my free time with the objective of being able to check what were my friends
up to without falling into a blackhole of meaningless content.

### ✨ Current features

- Block 'Reels' page
- Block 'Explore' page
- Block 'Stories' section and page
- Block 'Posts' feed
- Block 'Suggested followers' section
- Redirect 'For You' feed to 'Following' to avoid suggested posts
  
Missing something? Leave me a [suggestion](https://github.com/aymyo/antigram-extension/issues)! ☀️

### 📀 Stack
To avoid a build process and make development easier, I've sticked to browser native functionalities and JS, HTML and CSS.

### ⏬ Set it up in your browser

Download it from the [Chrome Store](https://chrome.google.com/webstore/detail/antigram-explore-blocker/igbheapdmolhhmmklmkfjjjncmhihfjh "Chrome Store") or install it mmanually follwing the next steps:

1. Clone the repo, `git clone https://github.com/aymyo/antigram-extension.git` or download the zip.
2. Go to Google Chrome and click 'Customize' (the three-dot icon top-right corner)
3. Go to Extensions > Manage Extensions
4. Toggle 'Developer mode'
5. Click 'Load unpacked'
6. Select the 'source' folder in the `antigram-extension` project
7. Done!

#### ⚠️ Disclaimer
Instragam updates periodically its web version, potentially breaking some functionalities of the extension. If that happens, please ensure you are using the last version of Antigram, and if that's the case, open an [issue](https://github.com/aymyo/antigram-extension/issues) so I can fix it! 🛠️

### 🤝 Contributing
If you want to contribute please feel free to do so by opening a PR. I will review it at some point (although I can't promise that happens soon!).

To start developing, do steps 1-7 and:
8. Open the terminal and change directory into the repo `cd antigram-extension`
11. Install the development packages with `yarn install`
12. Any change you make to the source folder will be automatically reflected if you refresh the extension.

[logo]: https://github.com/aymyo/antigram-extension/blob/main/images/ag32.png "Antigram Logo"

##### Sources and recommendations

This extension is mostly inspired by Jord West's
[News Feed Eradicator](https://github.com/jordwest/news-feed-eradicator), which I recommend if you
are a Facebook user. Additionally, I also recommend
[DF Youtube](https://chrome.google.com/webstore/detail/df-tube-distraction-free/mjdepdfccjgcndkmemponafgioodelna)
to have a better experience using Youtube.
