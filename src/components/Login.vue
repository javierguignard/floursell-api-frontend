<template>
    <div id="login">
        <el-row  justify="center" gutter="0" >
            <el-col :xs="24" :md="6" class="el-col-md-offset-9">
                <el-row type="flex" justify="center">
                    <h1>Login</h1>

                </el-row>
                <el-row>
                    <el-card>
                        <form @submit.prevent="submit">
                            <div>
                                Usuario:
                                <el-input type="text" v-model="username"></el-input>
                            </div>
                            <div>
                                Contraseña:
                                <el-input type="password" v-model="password"></el-input>
                            </div>
                            <br>
                            <el-col>
                                <el-button
                                        style="width:100%; margin-bottom:15px"
                                        native-type="submit"
                                        type="primary">Iniciar Sesion
                                </el-button>
                            </el-col>
                        </form>
                    </el-card>
                </el-row>
                <br>
                <el-row>
                    <el-card>
                        <p>¿No te has registrado todavia?</p>
                        <el-row type="flex">
                            <el-button style="width: 100%" type="warning" @click="move('registration')">Registrarse!
                            </el-button>
                        </el-row>
                    </el-card>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    //import {HTTP} from "./ApiConnection";
    import {HTTP_LOGIN} from "./ApiConnection"

    export default {
        name: "Login",
        data() {
            return {
                username: null,
                password: null
            };
        },
        methods: {
            move(route) {
                this.$router.push({name: route});
            },
            submit() {
                HTTP_LOGIN
                    .post("/auth/login/", {
                        username: this.username,
                        email: "",
                        password: this.password,
                    })
                    .then((response) => {
                        localStorage.setItem('key', response.data.key);
                        if (response.data.key) {
                            this.move("client");
                        }
                    })
                    .catch((error) => {
                            let err = "" + error;
                            if (err.indexOf("400") > 0) {
                                this.$message({
                                    showClose: true,
                                    message: 'Usuario o contraseña invalido',
                                    type: "error"
                                })
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: error,
                                    type: "error"
                                })
                            }
                        }
                    );
            }
        },
        beforeCreate() {
            localStorage.removeItem("clientID");
            localStorage.removeItem("key");
        }
    };
</script>

