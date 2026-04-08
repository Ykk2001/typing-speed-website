
const darkTheme = {
  label: "Dark",
  background: "#121212",
  color: "#FFFFFF",
  typeBoxText: "#AAAAAA"
};

const redTheme = {
  label: "Crimson",
  background: "#4c4043",
  color: "#e94654",
  typeBoxText: "#A8A8A8"
};

const fledging={
    label:'Fledging',
    background:'#3B363F',
    color:'#D76275',
    typeBoxText:'#8E5568'
}

export const themeOptions=[
    { label:'Dark',value:darkTheme},
    { label:'Red',value:redTheme},
    {label:'Fledging',value:fledging}
]//this label and value i have to keep same as above to use inside Select (react-select)