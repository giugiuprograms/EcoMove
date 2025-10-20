function mostrarTela(id){
    // alterna telas
    document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
    const ativa = document.getElementById(id);
    ativa.classList.add('ativa');

    // destaca aba ativa da tabbar desta tela
    destacarAba(ativa, id);

    // Se for para a tela de cadastro-final, pré-preenche o email
    if (id === 'cadastro-final') {
        const emailInput = document.getElementById('email');
        const emailCadastroInput = document.getElementById('email-cadastro');
        if (emailInput && emailCadastroInput) {
            emailCadastroInput.value = emailInput.value;
        }
    }

    // rola para o topo
    window.scrollTo({top:0, behavior:'instant'});
}

// FUNÇÃO ORIGINAL AJUSTADA PARA SIMULAR LOGIN EXISTENTE
function loginExistente(){
    // Simula validação e login
    mostrarTela('home');
}

// NOVA FUNÇÃO: Gerencia a finalização do cadastro
function finalizarCadastro() {
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    if (senha.length < 6) {
        alert('A senha deve ter no mínimo 6 caracteres.');
        return;
    }
    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    // Se o cadastro for bem-sucedido:
    alert('Cadastro concluído com sucesso! Bem-vindo(a) ao EcoMove!');
    mostrarTela('home');
}

// mapeia telas -> aba da tabbar (Ajustado para o novo fluxo com 'metas' separada)
const mapaAba = {
    home: 'home',
    perfil: 'perfil',
    notificacoes: 'home',
    'escolha-transporte': 'mapa',
    mapa: 'mapa',
    resumo: 'mapa',
    carteira: 'carteira',
    recompensas: 'carteira',
    cupom: 'carteira',
    impacto: 'home', // 'Visão Rápida' (acessada pelo tile 'Meu Impacto')
    metas: 'home', // Nova tela de metas (acessada pelo atalho circular)
    ranking: 'home',
    'cadastro-final': 'home',
    'dashboard-completo': 'home' // Dashboard (acessado pelo Card)
};

function destacarAba(sec, telaId){
    const target = mapaAba[telaId] || 'home';
    // limpa
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('tab-active'));
    // seta ativa
    const tabbar = document.querySelector('.tabbar');
    const btn = tabbar.querySelector(`.tab[data-tab="${target}"]`);
    if(btn) btn.classList.add('tab-active');
}

// clique da tabbar (mesma barra em todas as telas)
document.addEventListener('click', e => {
    const b = e.target.closest('.tab');
    if(!b) return;
    const tab = b.getAttribute('data-tab');
    // Mapeamento de abas para telas (simplificado)
    const destinoPorAba = {
        home: 'home',
        mapa: 'mapa',
        carteira: 'carteira',
        perfil: 'perfil'
    };
    const destino = destinoPorAba[tab] || 'home';
    mostrarTela(destino);
});

// garante posição no topo e destaca a home no carregamento
window.addEventListener('load', () => {
    window.scrollTo(0,0);
    const telaAtivaId = document.querySelector('.tela.ativa')?.id;
    if (telaAtivaId !== 'login') {
        destacarAba(document.body, telaAtivaId || 'home');
    }
});
