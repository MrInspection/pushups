const pushups = {};

const addPushUp = (interaction) => {
  pushups[interaction.member.id] = pushups[interaction.member.id] || {
    pushups: 0,
    history: [],
  };
  const today = new Date().toLocaleDateString();

  if (
    pushups[interaction.member.id].history[0] &&
    pushups[interaction.member.id].history[0].date !== today
  ) {
    pushups[interaction.member.id].pushups = 0;
  }

  pushups[interaction.member.id].pushups +=
    interaction.options.get("pushups").value;
  pushups[interaction.member.id].history = [
    {
      count: interaction.options.get("pushups").value,
      date: new Date().toLocaleDateString(),
    },
    ...pushups[interaction.member.id].history,
  ];
};

module.exports = { pushups, addPushUp };
