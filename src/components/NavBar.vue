<template>
    <div id="nav">
        <!-- The navigation bar when a user is logged in -->
        <div v-if="$root.store.username" id="Loggednav">
            <b-navbar toggleable="lg" type="dark" variant="info">
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item href="#">
                            <router-link :to="{ name: 'main' }">Main</router-link>
                        </b-nav-item>
                        <b-nav-item href="#">
                            <router-link :to="{ name: 'search' }">Search</router-link>
                        </b-nav-item>
                        <!-- Add route to About page -->
                        <b-nav-item href="#">
                            <router-link :to="{ name: 'about' }">About Us</router-link>
                        </b-nav-item>
                        <b-nav-item id="createRecipe"> Create Recipe </b-nav-item>
                        <!-- Drop down for personal info -->
                        <b-nav-item-dropdown text="Presonal" left>
                            <b-dropdown-item href="#" id="Favourites">
                                <router-link :to="{ name: 'favorites' }">
                                    My favourites
                                </router-link>
                            </b-dropdown-item>
                            <b-dropdown-item href="#">
                                My recipes
                            </b-dropdown-item>
                            <b-dropdown-item href="#">
                                My family recipes
                            </b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item id="hellowUser"> Hellow {{ $root.store.username }} </b-nav-item>
                        <b-nav-item id="hellowUser" @click="Logout"> Logout </b-nav-item>

                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
        <!-- The nevigation bar when no user is logged in -->
        <div v-else>
            <b-navbar toggleable="lg" type="dark" variant="info">
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item href="#">
                            <router-link :to="{ name: 'main' }">Main</router-link>
                        </b-nav-item>
                        <b-nav-item href="#">
                            <router-link :to="{ name: 'search' }">Search</router-link>
                        </b-nav-item>
                        <!-- Add route to About page -->
                        <b-nav-item href="#">About Us</b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav class="ml-auto">
                        <span v-if="!$root.store.username">
                            <b-nav-item id="hellowGuest"> Hellow Guest </b-nav-item>

                        </span>
                        <span v-if="!$root.store.username">
                            <b-nav-item href="#" id="register">
                                <router-link :to="{ name: 'register' }">Register</router-link>
                            </b-nav-item>
                        </span>
                        <span v-if="!$root.store.username">
                            <b-nav-item href="#" id="login">
                                <router-link :to="{ name: 'login' }">Login</router-link>
                            </b-nav-item>
                        </span>

                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        logout: { type: Function },
    },
    methods: {
        Logout() {
            this.logout();
        }
    }
}

</script>

<style>
#hellowGuest {
    font-size: large;
    font-family: 'Gill Sans';

}

img {
    background: transparent 0% 0% no-repeat padding-box;
    opacity: 1;
    width: 31px;
    height: 24px;
    margin-top: -12px;

}
</style>