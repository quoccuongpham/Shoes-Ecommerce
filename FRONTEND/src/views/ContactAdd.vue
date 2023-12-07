<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";

export default {
  components: {
    ContactForm,
  },
  data() {
    return {
      contact: null,
      message: "",
    }
  },
  methods: {
    async createContact(data) {
      try {
        const newContact = await ContactService.create(data);
        this.contact = newContact;
        this.message = "Đã tạo mới liên hệ"
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<template>
  <div class="page">
    <h4>Tạo liên hệ mới</h4>
    <ContactForm
        :contact="{}"
        @submit:contact="createContact"
    />
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>

</style>