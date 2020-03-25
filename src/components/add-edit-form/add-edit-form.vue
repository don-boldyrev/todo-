<template>
  <div>
    <portal :to="(inModal ? 'modal-portal' : 'default-portal') + `-${idPortal}`">
      <validation-observer
        :key="idPortal"
        ref="observer"
        tag="form"
        class="add-form"
        :class="inModal ? 'in-modal' : ''"
        @submit.prevent="submit"
      >
        <validation-provider
          rules="required"
          v-slot="{ errors }"
        >
          <v-textarea
            v-model="form.description"
            name="description"
            :height="200"
            class="control"
            :label="label"
            @enterKey="submit"
          />
          <div class="error">
            {{ errors[0] }}
          </div>
        </validation-provider>
        <div class="btn-wrapper">
          <v-button
            view-type="succsess"
            type="submit"
          >
            {{ startForm ? 'Edit' : 'Add' }}
          </v-button>
          <v-button
            v-if="startForm"
            class="btn-cancel"
            @click="cancel"
          >
            Cancel
          </v-button>
        </div>
        <confirm-modal
          ref="cancel-modal"
          question='Discard changes?'
          apply-btn-text='Yes'
          @apply="cancelApply"
        />
      </validation-observer>
    </portal>
    <modal
      ref="form-modal"
      :blockClose="!isSubmited && notSaveChanges"
      @blockClose="onBlockClose"
    >
      <portal-target :name="`modal-portal-${idPortal}`" />
    </modal>
    <portal-target :name="`default-portal-${idPortal}`" />
  </div>
</template>

<script src="./add-edit-form.js"/>
<style src="./add-edit-form.scss" lang="scss" scoped/>