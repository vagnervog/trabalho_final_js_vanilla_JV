  // Variáveis globais
  let parkingSpots = []; // Array para armazenar as vagas de estacionamento
  let totalBill = 0; // Variável para armazenar o valor total devido

  // Função para inicializar as vagas de estacionamento
  function initializeParkingSpots(numSpots) {
      for (let i = 0; i < numSpots; i++) {
          parkingSpots.push({
              occupied: false,
              placaVeiculo: null,
              entryTime: null
          });
      }
      updateParkingStatus();
  }

  // Função para atualizar o status das vagas de estacionamento no HTML
  function updateParkingStatus() {
      let occupiedCount = parkingSpots.filter(spot => spot.occupied).length;
      let freeCount = parkingSpots.length - occupiedCount;

      document.getElementById('occupied-spots').textContent = occupiedCount;
      document.getElementById('free-spots').textContent = freeCount;
  }

  // Função para adicionar uma vaga
  document.getElementById('add-spot').addEventListener('click', function() {
      parkingSpots.push({
          occupied: false,
          placaVeiculo: null,
          entryTime: null
      });
      updateParkingStatus();
  });

  // Função para remover uma vaga
  document.getElementById('remove-spot').addEventListener('click', function() {
      let lastSpot = parkingSpots[parkingSpots.length - 1];
      if (!lastSpot.occupied) {
          parkingSpots.pop();
          updateParkingStatus();
      } else {
          alert('Não é possível remover uma vaga ocupada.');
      }
  });

  // Função para registrar a entrada de um carro
  document.getElementById('park-button').addEventListener('click', function() {
      let placaVeiculo = document.getElementById('placaVeiculo').value.trim();
      if (placaVeiculo !== '') {
          parkCar(placaVeiculo);
      }
  });

  // Função para registrar a saída de um carro
  document.getElementById('park-button-out').addEventListener('click', function() {
      let placaVeiculo = document.getElementById('placaVeiculoSaida').value.trim();
      if (placaVeiculo !== '') {
          exitCar(placaVeiculo);
      }
  });

  // Função para registrar a entrada de um carro
  function parkCar(placaVeiculo) {
      // Encontrar a primeira vaga livre
      let freeSpotIndex = parkingSpots.findIndex(spot => !spot.occupied);

      if (freeSpotIndex !== -1) {
          parkingSpots[freeSpotIndex].occupied = true;
          parkingSpots[freeSpotIndex].placaVeiculo = placaVeiculo;
          parkingSpots[freeSpotIndex].entryTime = new Date(); // Horário de entrada

          updateParkingStatus(); // Atualizar a exibição das vagas
      } else {
          alert('Não há vagas disponíveis.');
      }
  }

  // Função para registrar a saída de um carro
  function exitCar(placaVeiculo) {
      let parkedSpot = parkingSpots.find(spot => spot.occupied && spot.placaVeiculo === placaVeiculo);

      if (parkedSpot) {
          const now = new Date();
          const parkedTimeMs = now - parkedSpot.entryTime;
          const parkedTimeHours = Math.ceil(parkedTimeMs / (1000 * 60 * 60)); // Horas arredondadas para cima
          const amountDue = parkedTimeHours * 2; // Cada hora custa R$ 2,00

          totalBill += amountDue; // Atualiza o valor total devido
          document.getElementById('total-bill').textContent = totalBill.toFixed(2); // Exibe o valor total formatado

          alert(`Tempo estacionado: ${parkedTimeHours} horas\nValor a pagar: R$ ${amountDue.toFixed(2)}`);

          // Liberar a vaga
          parkedSpot.occupied = false;
          parkedSpot.placaVeiculo = null;
          parkedSpot.entryTime = null;

          updateParkingStatus(); // Atualizar a exibição das vagas
      } else {
          alert(`Veículo com PLACA ${placaVeiculo} não encontrado no estacionamento.`);
      }
  }

  

  // Inicializar o sistema com 10 vagas de estacionamento
  initializeParkingSpots(10);