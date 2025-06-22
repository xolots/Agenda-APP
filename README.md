# Agenda App

A simple web application for managing your daily agenda. This application allows users to add, view, update, and delete agenda items.

---

## Features

* **Create:** Easily add new agenda items.
* **View:** See all your scheduled tasks in a clear list.
* **Update:** Modify existing agenda items as needed.
* **Delete:** Remove completed or unwanted tasks.
* **Responsive Design:** Optimized for various devices using Bootstrap.

---

## Technologies Used

### Backend
* **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine, used for building the server-side logic.
* **Express.js:** A fast, unopinionated, minimalist web framework for Node.js, used for handling API routes and server setup.

### Database
* **MongoDB:** A NoSQL document database, used for storing agenda items.

### Frontend
* **HTML5:** The standard markup language for creating web pages.
* **CSS3:** A style sheet language used for describing the presentation of a document written in HTML.
* **Bootstrap:** A free and open-source CSS framework directed at responsive, mobile-first front-end web development.

---

## Getting Started

Follow these steps to get your local copy up and running.

### Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/en/download/) (LTS version recommended)
* [MongoDB](https://docs.mongodb.com/manual/installation/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd agenda-app
    ```

2.  **Install backend dependencies:**

    Navigate to the backend directory (if separate, otherwise in the root) and install Node.js packages:

    ```bash
    cd backend # or just stay in the root if your Node.js project is there
    npm install
    ```

3.  **Configure Environment Variables:**

    Create a `.env` file in the backend directory (or root, depending on your project structure) and add your MongoDB connection URI:

    ```
    MONGODB_URI=mongodb://localhost:27017/agenda_db
    PORT=3000
    ```

    * Replace `mongodb://localhost:27017/agenda_db` with your MongoDB connection string if it's different (e.g., for a cloud-hosted database).

4.  **Start the backend server:**

    ```bash
    npm start
    ```

    The backend server will typically run on `http://localhost:3000` (or the port you configured).

5.  **Open the frontend:**

    The frontend (HTML, CSS, Bootstrap) can usually be opened directly in your web browser by navigating to the `index.html` file, or it might be served by your backend if you've set it up that way.

    If your frontend files are in a `public` or `frontend` directory, open `frontend/index.html` in your browser.

---

## Usage

Once the application is running, you can:

* **Add an agenda item:** Use the input field and "Add" button.
* **Edit an agenda item:** Click on an existing item to modify it.
* **Delete an agenda item:** Click the delete icon next to an item.

---

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and create a pull request.

---

## License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT). You are free to use, modify, and distribute this code.