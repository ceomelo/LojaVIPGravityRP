function openModal(name, description, price) {
  document.getElementById('modal-title').textContent = name;
  document.getElementById('modal-description').textContent = `Descrição: ${description}\nPreço: ${price}`;
  document.getElementById('modal').style.display = 'block';
  document.getElementById('qr-code').style.display = 'block';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
  document.getElementById('qr-code').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const purchaseForm = document.getElementById('purchase-form');
  const webhookURL = "https://discord.com/api/webhooks/1355237858566213632/QWBAn1SRycmX9TKbP3MU89bqW2ALe05sM4IS7QoucqUHHhF-ls010zqcavXohYlchsr_";

  purchaseForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const discordName = document.getElementById('discordName').value;
    const cityID = document.getElementById('cityID').value;
    const bankName = document.getElementById('bankName').value;
    const product = document.getElementById('modal-title').textContent;
    const description = document.getElementById('modal-description').textContent;

    const bodyData = {
      username: "Logs de Pedidos - Gravity RP",
      avatar_url: "https://cdn.discordapp.com/attachments/1330416104148959304/1363228189857681960/Nova_Logo_Gravity_RP.webp",
      embeds: [
        {
          title: "🛍️ NOVA COMPRA EFETUADA",
          description: "Um novo pedido foi realizado na loja!",
          color: 0x00ffc3,
          thumbnail: {
            url: "https://cdn.discordapp.com/attachments/1330416104148959304/1363229504314806575/standard_1.gif"
          },
          fields: [
            { name: "💬 Nome no Discord", value: discordName || "Não informado", inline: true },
            { name: "🆔 ID na City", value: cityID || "Não informado", inline: true },
            { name: "🏦 Nome no Extrato", value: bankName || "Não informado", inline: false },
            { name: "🛒 Produto", value: product || "Desconhecido", inline: false },
            { name: "📄 Detalhes", value: description || "Sem detalhes", inline: false },
            { name: "💠 Marca d'água", value: "Gravity RP 🛰️", inline: false } // <<< aqui está o selo textual!
          ],
          footer: {
            text: "🔗 Sistema de Vendas | Gravity RP",
            icon_url: "https://cdn.discordapp.com/attachments/1330416104148959304/1363229504314806575/standard_1.gif"
          },
          timestamp: new Date().toISOString()
        }
      ]
    };

    try {
      const response = await fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData)
      });

      if (response.ok) {
        alert("✅ Compra realizada com sucesso!");
      } else {
        alert("❌ Erro ao realizar a compra. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      alert("❌ Erro ao enviar os dados. Verifique sua conexão.");
    }

    closeModal();
    purchaseForm.reset();
  });
});