<template lang="pug">
.container
 .section.columns
  .column
    aside.menu
      h1.title Admin Panel
      p.menu-label Entries
      ul.menu-list
        li #[a(href="#list") Entries List]
        li #[a(href="#add") Add Entries]
        li #[a(href="#manage") Manage Options]
      ul.menu-list
        li 
          a.level-item.home(href="/") 
            b-icon.is-small(icon="arrow-left")
            span Return to Raffle Page
  .column.is-three-quarters
    h2#list Entries List
    b-table(:data="entries", :striped="true", :narrowed="true")
      template(slot-scope="{row}")
        b-table-column(field="id", label="Student Number") {{ row.id }}
        b-table-column(field="name", label="Name") {{ row.name }}
        b-table-column(field="winner", label="Winner") {{ row.winner ? "Yes" : "No" }}
        b-table-column(label="Options", width="100", :numeric="true")
          button.button.is-small(@click.prevent="remove(row.id, row.name)") 
            b-icon(icon="delete")
            span Delete
      template(slot="empty")
        p.empty No Entries
    h2#add Add Entries
    .columns.content
      .column
        p Add a single entry ...
        form#single-entry(@submit.prevent="submitSingle")
          b-field(label="Student Number")
            b-input(v-model="form.id")
          b-field(label="Name")
            b-input(v-model="form.name")
          .buttons.is-right
            button.button Submit
      .column
        p ... or upload CSV file from Google Forms
        form#multiple-entry(@submit.prevent="submitFile")
          b-field
            b-upload(v-model="form.file", drag-drop, accept=".csv")
              .section.has-text-centered.content
                p #[b-icon(icon="upload", size="is-large")]
                p {{ form.file ? form.file.name : "Drop your file here or click to upload" }}
          .buttons.is-right
            button.button Submit
    h2#manage Manage Options
    .options
      button.button.is-outlined(@click.prevent="resetWinners") Reset Winners
      p.
        This option will reset all winners.
        All entries are once again eligible to be picked in the raffle. 
      button.button.is-danger.is-outlined(@click.prevent="deleteAll") Delete all Entries
      p.
        This option will erase all data. Use with caution.
</template>

<script>
import axios from "axios";
import { Snackbar } from "buefy/dist/components/snackbar";

const alertError = message =>
  Snackbar.open({
    type: "is-danger",
    message,
    queue: false
  });

const process = (axiosCall, errMessage = "An error occured") =>
  axiosCall
    .then(res => res.data)
    .then(response => {
      if (response.success && response.result) {
        return response.result;
      } else return Promise.reject(response.error);
    });

export default {
  mounted() {
    this.updateEntries();
  },
  data() {
    return {
      entries: [],
      form: {
        name: undefined,
        id: undefined,
        file: undefined
      }
    };
  },
  methods: {
    clearForm() {
      this.form.name = undefined;
      this.form.id = undefined;
      this.form.file = undefined;
    },
    async submitSingle() {
      try {
        await process(
          axios.post("/api/", {
            name: this.form.name,
            id: this.form.id
          })
        );
        this.$snackbar.open("Successfully submitted");
        await this.updateEntries();
        this.clearForm();
      } catch (err) {
        alertError("An error occured.");
      }
    },
    async submitFile() {
      const data = new FormData();
      data.append("file", this.form.file);
      try {
        const result = await process(
          axios.post("/api/upload/", data, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
        );
        const successes = result.filter(({ result }) => result === true).length;
        const failures = result.length - successes;
        if (successes) {
          this.$snackbar.open(`Uploaded ${successes} entries.`);
        }
        if (failures) {
          alertError(`Unable to upload ${failures} entries`);
        }
        await this.updateEntries();
        this.clearForm();
      } catch (err) {
        alertError("An error occured while uploading file");
      }
    },
    remove(id, name) {
      this.$dialog.confirm({
        message: `Are you sure you want to remove ${name} from the raffle?`,
        onConfirm: async () => {
          try {
            await process(axios.delete(`/api/entry/${id}`));
            this.$snackbar.open(`Successfully removed ${name}`);
            await this.updateEntries();
          } catch (err) {
            alertError(`An error occured while deleting ${name}`);
          }
        }
      });
    },
    async updateEntries() {
      try {
        this.entries = await process(axios.get("/api/"));
      } catch (err) {
        alertError("An error occurred while loading entries.");
      }
    },
    resetWinners() {
      this.$dialog.confirm({
        message: "Are you sure you want to reset the winners of the raffle?",
        onConfirm: async () => {
          try {
            await process(axios.delete("/api/raffle"));
            this.$snackbar.open("Winners have been reset.");
            await this.updateEntries();
          } catch (err) {
            console.warn(err);
            alertError("An error occured");
          }
        }
      });
    },
    deleteAll() {
      this.$dialog.confirm({
        message: "Are you sure you want to delete ALL DATA?",
        onConfirm: async () => {
          try {
            await process(axios.delete("/api/"));
            this.$snackbar.open("Everything has been deleted");
            await this.updateEntries();
          } catch (err) {
            console.warn(err);
            alertError("An error occured");
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
h1 {
  font-weight: bold;
}

h2 {
  font-weight: bold;
  font-size: 1.5em;
  margin-top: 2em;
  margin-bottom: 1em;
  border-bottom: 1px solid #ddd;
}

.menu {
  position: sticky;
  top: 1em;
}

.home {
  margin-top: 2em;
}

.home .icon {
  vertical-align: middle;
  margin-right: 0.5em;
  margin-left: -1.5em;
}

.upload-draggable {
  width: 100%;
}

.empty {
  padding: 1em;
  text-align: center;
}

.options {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: baseline;
  grid-gap: 2em;
}
</style>
