<h2 align="center">Kiosk Slideshow</h2>

A simple Node.js application that serves a random slideshow of media files (images and videos) from a media folder.

#### Preview
https://github.com/Waltssu/kiosk-slideshow/assets/98592722/82eb9153-3acf-4340-91e5-710e1c58118c

---

#### Features

- Serve images and videos in a random order from the `media` folder.
- Automatically update the media array when new media files are added to the `media` folder.
- Animate transitions between media files.
- Handle video duration for automatic transitions.

#### Planned features

- Arrow buttons for manual navigation through the slideshow.
- Marking specific media files for importance to show them longer.

#### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (version 14.x or higher)

#### Functionality

- [Express](https://expressjs.com/): A minimal and flexible Node.js web application framework.
- [EJS](https://ejs.co/): Embedded JavaScript templating.
- [Body-parser](https://github.com/expressjs/body-parser): Node.js body parsing middleware.
- [FS](https://nodejs.org/api/fs.html): File system module for Node.js.
- [Path](https://nodejs.org/api/path.html): Path module for Node.js.

#### Installation

1. Clone the repository:

```
git clone https://github.com/Waltssu/kiosk-slideshow.git
```

2. Navigate to the project directory:

```
cd kiosk-slideshow
```

3. Install:

```
npm install
```

4. Add your media files (images and videos) to the `media` folder.

5. Start the application:

```
npm start
```

The application will be running at [http://localhost:3000](http://localhost:3000).

### Project Structure

- `index.js`: Main application file, sets up the Express server and routes.
- `anim.js`: JavaScript file that handles the slideshow, animations, and user interactions.
- `api.js`: JavaScript code snippet that fetches media files from the API and renders them in HTML.
- `views/index.ejs`: EJS template that renders the media files as an HTML page.


