export const define = elem => {
  customElements.define(`${elem.name.toLowerCase()}-blam`, elem);
}