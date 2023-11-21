import type { PublicPathState } from 'vee-validate'

export function bindConfig() {
  return (state: PublicPathState) => {
    return {
      model: 'value',
      props: {
        hasFeedback: !!state.errors[0],
        help: state.errors[0],
        validateStatus: state.errors[0] ? 'error' : undefined,
      },
    }
  }
}
