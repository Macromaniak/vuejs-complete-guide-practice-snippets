<template>
  <base-container>
    <h2>Active Users</h2>
    <base-search @search="updateSearch" :search-term="enteredSearchTerm"></base-search>
    <div>
      <button @click="sort('asc')" :class="{selected: sorting === 'asc'}">Sort Ascending</button>
      <button @click="sort('desc')" :class="{selected: sorting === 'desc'}">Sort Descending</button>
    </div>
    <ul>
      <user-item
        v-for="user in displayedUsers"
        :key="user.id"
        :user-name="user.fullName"
        :id="user.id"
        @list-projects="$emit('list-projects', $event)"
      ></user-item>
    </ul>
  </base-container>
</template>

<script>
import { toRefs} from 'vue';
import useSearch from '../../hooks/search';
import useSort from '../../hooks/sort';
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  props: ['users'],
  emits: ['list-projects'],
  setup(props) {

    const {users} = toRefs(props); 
    const [enteredSearchTerm, availableUsers, updateSearch] = useSearch(users, 'fullName');
    

    const [displayedUsers, sorting, sort] = useSort(availableUsers, 'fullName');
    // const sorting = ref(null);
    // const displayedUsers = computed(function () {
    //   if (!sorting.value) {
    //     return availableUsers.value;
    //   }
    //   return availableUsers.value.slice().sort((u1, u2) => {
    //     if (sorting.value === 'asc' && u1.fullName > u2.fullName) {
    //       return 1;
    //     } else if (sorting.value === 'asc') {
    //       return -1;
    //     } else if (sorting.value === 'desc' && u1.fullName > u2.fullName) {
    //       return -1;
    //     } else {
    //       return 1;
    //     }
    //   });
    // });

    // function sort(mode) {
    //   sorting.value = mode;
    // }

    return {
      enteredSearchTerm,
      updateSearch,
      displayedUsers,
      sorting,
      sort
    };
  },
  
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>