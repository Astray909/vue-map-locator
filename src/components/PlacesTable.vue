<template>
    <div>
        <v-btn color="red" @click="deleteSelectedPlaces">Delete Selected Places</v-btn>
        <v-data-table
            :headers="headers"
            :items="places"
            :single-select="false"
            item-key="name"
            show-select
            class="elevation-1"
            v-model="selectedPlaces"
            :options.sync="options"
            :items-per-page="10"
        >
        </v-data-table>
    </div>
</template>

<script>
    export default{
        props: ['places', 'removePlace'],
        data(){
            return{
                selectedPlaces: [],
                headers: [
                   { text: 'Places', value: 'name' },
                   { text: 'Created At', value: 'created_at' },
                ],
                options:{
                    page: 1,
                    itemsPerPage: 10,
                    // by default sort by created_at
                    sortBy: ['created_at'],
                    sortDesc: [true],
                },
            }
        },
        methods:{
            deleteSelectedPlaces(){
                this.selectedPlaces.forEach(place =>{
                    this.removePlace(place);
                });
                this.selectedPlaces = [];
            },
        }
    };
</script>
