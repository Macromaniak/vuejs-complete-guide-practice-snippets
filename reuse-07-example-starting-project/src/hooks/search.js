import { ref, computed, watch } from "vue";

export default function useSearch(items, searchProp) {
    const enteredSearchTerm = ref('');
    const activeSearchTerm = ref('');

    const availableItems = computed(function () {
      let filtereditems = [];
      if (activeSearchTerm.value) {
        filtereditems = items.value.filter((i) =>
          i[searchProp].includes(activeSearchTerm.value)
        );
      } else if (items.value) {
        filtereditems = items.value;
      }
      return filtereditems;
    });

    watch(enteredSearchTerm, function (newValue) {
      setTimeout(() => {
        if (newValue === enteredSearchTerm.value) {
          activeSearchTerm.value = newValue;
        }
      }, 300);
    });

    function updateSearch(val) {
      enteredSearchTerm.value = val;
    }

    return [enteredSearchTerm, availableItems, updateSearch];
}