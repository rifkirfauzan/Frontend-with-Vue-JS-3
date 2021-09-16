<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>DATA WARGA</h4>
                        <hr>
                        <router-link :to="{name: 'warga.create'}" class="btn btn-md btn-success">TAMBAH DATA WARGA</router-link>

                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NAMA WARGA</th>
                                    <th scope="col">ALAMAT</th>
                                    <th scope="col">PEKERJAAN</th>
                                    <th scope="col">NO TELEPON</th>
                                    <th scope="col">OPTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(warga, index) in warga" :key="index">
                                    <td>{{ warga.nama_warga }}</td>
                                    <td>{{ warga.alamat }}</td>
                                    <td>{{ warga.pekerjaan }}</td>
                                    <td>{{ warga.no_telp }}</td>
                                    <td class="text-center">
                                        <router-link :to="{name: 'warga.edit', params:{id: warga.id }}" class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                      <button @click.prevent="wargaDelete(warga.id)" class="btn btn-sm btn-danger ml-1">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'

export default {

     setup() {
        //reactive state
        let warga = ref([])
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/warga')
            .then(response => {
              
              //assign state warga with response data
              warga.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })
        //method delete
        function wargaDelete(id) {
            
            //delete data warga by ID
            axios.delete(`http://localhost:8000/api/warga/${id}`)
            .then(() => {
              
              //splice warga 
              warga.value.splice(warga.value.indexOf(id), 1);
            }).catch(error => {
                console.log(error.response.data)
            })
        }
        //return
        return {
            warga,
            wargaDelete
        }
    }
}
</script>

<style>
    body{
        background:  rgb(18, 69, 163);
    }
</style>