<template>
        <button type="button" :class="'btn ' + btnClass" data-toggle="modal" :data-target="'#modal-' + uniqId">
            <slot name="buttonName">
                {{ button }}
            </slot>
        </button>
        <!-- Modal -->
        <div class="modal fade direction-l2r" :id="'modal-' + uniqId" tabindex="-1" role="dialog" :aria-labelledby="'exampleModalLabel-' + uniqId" aria-hidden="true">
            <div :class="'modal-dialog ' + sizeClassModal" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" :id="'exampleModalLabel-' + uniqId">{{ modalTitle }}</h5>

                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" v-if="!bodyOff">
                        <slot name="body">

                        </slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ buttonDismissText }}</button>
                            <button type="button" class="btn btn-primary">{{ buttonConfirmText }}</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>

export default {

  props: {
    button: String,
    buttonConfirmText: String,
    buttonDismissText: String,
    modalTitle: String,
    size: String,
    btnClass: String,
    bodyOff: Boolean,

  },
  data(){
    return{
        sizeClassModal:'',
        uniqId:'',
    };
  },
  mounted() {
    const sec = Date.now() * 1000 + Math.random() * 1000;
    const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
    let prefix = ""; let random = false;
    this.uniqId =  `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}`:""}`;
    switch (this.size) {
        case 'sm':
            this.sizeClassModal = 'modal-sm';
            break;
        case 'lg':
            this.sizeClassModal = 'modal-lg';
            break;
        case 'xl':
            this.sizeClassModal = 'modal-xl';
            break;
    
        default:
            this.sizeClassModal = '';
            break;
    }
  }
  


}
</script>
