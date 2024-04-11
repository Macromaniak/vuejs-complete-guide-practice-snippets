
import { RouterLink } from 'vue-router';
<template>
    <section>
        <base-card>
            <h2>404 - Not found</h2>
            <p>The page you are looking for is not found! Please check out our coaches page <RouterLink to="/coaches">here</RouterLink></p>
        </base-card>
    </section>
</template>