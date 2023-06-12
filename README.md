# Vue Map Locator

Vue Map Locator is a Vue.js based web application that allows users to search for places using the Google Maps API, mark their current location on the map, and see information about different places, including their time zones.

## Features

- Search for places and see them on the map.
- Get current location and mark it on the map.
- List all selected places in a table with their creation timestamp.
- Delete selected places from the table and the map.
- Fetch and display the time zone and local time of the latest selected place.

## Project setup

1. Clone the repository:

    ```bash
    git clone https://github.com/Astray909/vue-map-locator
    ```

2. Install dependencies:

    ```bash
    cd vue-map-locator
    npm install
    ```

3. Create a `.env` file in your root directory and add your Google Maps and Google Timezone API keys:

    ```bash
    VUE_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
    VUE_APP_GOOGLE_TIME_API_KEY=your_google_time_api_key
    ```

4. Run the application:

    ```bash
    npm run serve
    ```

This command will start the application on `localhost:8080` (or another port if `8080` is busy).

## Built With

- [Vue.js](https://vuejs.org/)
- [Vuetify](https://vuetifyjs.com/)
- [vue2-google-maps](https://www.npmjs.com/package/vue2-google-maps)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT