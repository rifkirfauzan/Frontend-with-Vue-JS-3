<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT DATA WARGA</h4>
                        <hr>

                        <form @submit.prevent="update">
                           <div class="form-group">
                                <label for="nama_warga" class="font-weight-bold">NAMA WARGA</label>
                                <input type="text" class="form-control" v-model="warga.nama_warga" placeholder="Masukkan nama_warga">
                                <!-- validation -->
                                <div v-if="validation.nama_warga" class="mt-2 alert alert-danger">
                                    {{ validation.nama_warga[0] }}
                                </div>
                            </div>
                              <div class="form-group">
                                <label for="alamat" class="font-weight-bold">ALAMAT</label>
                                <textarea class="form-control" rows="4" v-model="warga.alamat" placeholder="Masukkan Alamat warga"></textarea>
                                <!-- validation -->
                                <div v-if="validation.alamat" class="mt-2 alert alert-danger">
                                    {{ validation.alamat[0] }}
                                </div>
                            </div>
                            
                           <div class="form-group">
                            <label for="pekerjaan" class="font-weight-bold">PEKERJAAN</label>
                            <select class="form-select" v-model="warga.pekerjaan" placeholder="Masukkan pekerjaan">
                                    <!-- <option selected>--- Silahakan pilih jenis pekerjaan ---</option> -->
                                    <option value="pns">PNS</option>
                                    <option value="pegawai_swasta">Pegawai swasta</option>
                                    <option value="wiraswasta">Wiraswasta</option>
                                    <option value="buruh">Buruh</option>
                                    <option value="guru_dosen">Guru / Dosen</option>
                                    <option value="pelajar_mahasiswa">Pelajar / Mahasiswa</option>
                             </select>
                               <!-- validation -->
                                <div v-if="validation.pekerjaan" class="mt-2 alert alert-danger">
                                    {{ validation.pekerjaan[0] }}
                                </div>
                             </div>

                               <div class="form-group">
                                <label for="no_telp" class="font-weight-bold">NO TELEPON</label>
                                <input type="number" class="form-control" v-model="warga.no_telp" placeholder="Masukkan no_telp">
                                <!-- validation -->
                                <div v-if="validation.no_telp" class="mt-2 alert alert-danger">
                                    {{ validation.no_telp[0] }}
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>                        

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {

    setup() {

        //state posts
        const warga = reactive({
            title: '',
            content: ''
        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //vue router
        const route = useRoute()

        //mounted
        onMounted(() => {

            //get API from Laravel Backend
            axios.get(`http://localhost:8000/api/warga/${route.params.id}`)
            .then(response => {
              
              //assign state posts with response data
              warga.nama_warga    = response.data.data.nama_warga  
              warga.alamat  = response.data.data.alamat  
              warga.pekerjaan  = response.data.data.pekerjaan  
              warga.no_telp  = response.data.data.no_telp  

            }).catch(error => {
                console.log(error.response.data)
            })

        })

        //method update
        function update() {

            let nama_warga   = warga.nama_warga
            let alamat = warga.alamat
            let pekerjaan = warga.pekerjaan
            let no_telp = warga.no_telp

            axios.put(`http://localhost:8000/api/warga/${route.params.id}`, {
                nama_warga: nama_warga,
                alamat: alamat,
                pekerjaan: pekerjaan,
                no_telp: no_telp,
            }).then(() => {

                //redirect ke post index
                router.push({
                    name: 'warga.index'
                })

            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })

        }

        //return
        return {
            warga,
            validation,
            router,
            update
        }

    }

}
</script>

<style>
    body{
        background:  rgb(18, 69, 163);
    }
</style>