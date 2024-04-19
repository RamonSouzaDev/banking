import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
// Styles
import "./VSpeedDial.css";

// Components
import { VDefaultsProvider } from "../../components/VDefaultsProvider/index.mjs";
import { makeVMenuProps, VMenu } from "../../components/VMenu/VMenu.mjs"; // Composables
import { makeComponentProps } from "../../composables/component.mjs";
import { makeTransitionProps, MaybeTransition } from "../../composables/transition.mjs"; // Utilities
import { ref } from 'vue';
import { genericComponent, propsFactory, useRender } from "../../util/index.mjs"; // Types
export const makeVSpeedDialProps = propsFactory({
  ...makeComponentProps(),
  ...makeVMenuProps({
    offset: 8,
    minWidth: 0,
    location: 'top center'
  }),
  ...makeTransitionProps({
    transition: 'fade-transition'
  })
}, 'VSpeedDial');
export const VSpeedDial = genericComponent()({
  name: 'VSpeedDial',
  props: makeVSpeedDialProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const menuRef = ref();
    useRender(() => {
      const menuProps = VMenu.filterProps(props);
      return _createVNode(VMenu, _mergeProps(menuProps, {
        "class": props.class,
        "style": props.style,
        "contentClass": "v-speed-dial__content",
        "ref": menuRef
      }), {
        ...slots,
        default: slotProps => _createVNode(VDefaultsProvider, {
          "defaults": {
            VBtn: {
              size: 'small'
            }
          }
        }, {
          default: () => [_createVNode(MaybeTransition, {
            "appear": true,
            "group": true,
            "transition": props.transition
          }, {
            default: () => [slots.default?.(slotProps)]
          })]
        })
      });
    });
    return {};
  }
});
//# sourceMappingURL=VSpeedDial.mjs.map