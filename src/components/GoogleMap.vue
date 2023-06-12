<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <Map :center="center" :zoom="zoom" style="width: 100%; height: 800px" ref="gmap">
                    <GMarker v-for="(position, index) in markers" :key="index" :position="position" />
                </Map>
            </v-col>
        </v-row>
        <!-- User's current location and search input -->
        <v-row>
            <v-col cols="4">
                <v-btn color="primary" @click="getCurrentLocation">Get Current Location</v-btn>
            </v-col>
            <v-col cols="8">
                <Autocomplete class="autocomplete" placeholder="Search places..." @place_changed="setPlace"/>
            </v-col>
        </v-row>
        <!-- Displaying time zone and local time -->
        <v-row>
            <v-col>
                <div v-if="latestTimeZone && localTime">
                    <p>Time Zone:{{ latestTimeZone }}</p>
                    <p>Local Time:{{ new Date(localTime).toLocaleString() }}</p>
                </div>
                <PlacesTable :places="places" :removePlace="removePlace"></PlacesTable>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import{ Map, Autocomplete, Marker as GMarker } from "vue2-google-maps";
    import PlacesTable from './PlacesTable.vue'

    export default{
        name: 'GoogleMap',
        components:{
            Map,
            Autocomplete,
            PlacesTable,
            GMarker
        },
        data(){
            return{
                // the default map view
                center:{lat: 43, lng: -79},
                zoom: 8,
                markers: [],
                places: [],
                latestTimeZone: null,
                localTime: null,
            }
        },
        methods:{
            getCurrentLocation(){
                if (navigator.geolocation){
                    // Check if geolocation is supported by the browser
                    navigator.geolocation.getCurrentPosition((position) =>{
                        // Retrieve the latitude and longitude of the current position
                        const newLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
                        this.center = newLocation;
                        this.zoom = 15;
                        this.$refs.gmap.$mapObject.setCenter(this.center);
                        this.$refs.gmap.$mapObject.setZoom(this.zoom);
                        // Add the new location as a marker on the map
                        this.markers.push(newLocation);
                    }, () =>{
                        alert('Error getting location');
                    });
                } else{
                    alert('Geolocation is not supported by this browser.');
                }
            },
            async setPlace(place){
                const newLocation = {
                    // Retrieve the latitude, longitude, and other details of the selected place
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                    name: place.formatted_address,
                    created_at: this.formatDateTime(new Date())
                };
                this.center = newLocation;
                this.zoom = 15;
                this.$refs.gmap.$mapObject.setCenter(this.center);
                this.$refs.gmap.$mapObject.setZoom(this.zoom);
                this.markers.push(newLocation);
                this.places.push(newLocation);
                
                // Get the timestamp for the API request
                const timestamp = Math.floor(Date.now() / 1000);

                // Fetch timezone for new location
                const response = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${newLocation.lat},${newLocation.lng}&timestamp=${timestamp}&key=${process.env.VUE_APP_GOOGLE_TIME_API_KEY}`);
                if (!response.ok){
                    alert('Error getting timezone information');
                    return;
                }
                const timezoneData = await response.json();
                // stored in data
                this.latestTimeZone = timezoneData.timeZoneId;

                // Compute the local time
                const date = new Date();
                const utc = date.getTime() + (date.getTimezoneOffset() * 60000); //UTC time
                this.localTime = new Date(utc + (1000 * timezoneData.rawOffset) + (1000 * timezoneData.dstOffset)).toLocaleString();
            },
            removePlace(place){
                this.places = this.places.filter(p => p !== place);
                this.markers = this.markers.filter(m => m !== place);
                if (this.places.length === 0){
                    this.center = {lat: 43, lng: -79};
                    this.zoom = 8;
                }
            },
            formatDateTime(date){
                const month = ("0" + (date.getMonth() + 1)).slice(-2);
                const day = ("0" + date.getDate()).slice(-2);
                const hours = ("0" + date.getHours()).slice(-2);
                const minutes = ("0" + date.getMinutes()).slice(-2);
                const seconds = ("0" + date.getSeconds()).slice(-2);

                return `${month}-${day} ${hours}:${minutes}:${seconds}`;
            },
        }
    };
</script>


<style>
    .autocomplete{
        margin-bottom: 10px;
        width: 100%;
        max-width: 500px;
        padding: 10px;
        font-size: 16px;
        border: 1px solid black;
    }
</style>
  