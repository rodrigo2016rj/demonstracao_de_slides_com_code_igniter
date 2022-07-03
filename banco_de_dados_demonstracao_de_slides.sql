-- -------------------------------------------------------------------------
-- banco_de_dados_demonstracao_de_slides

DROP SCHEMA IF EXISTS banco_de_dados_demonstracao_de_slides;

CREATE SCHEMA IF NOT EXISTS banco_de_dados_demonstracao_de_slides 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE banco_de_dados_demonstracao_de_slides;

-- -------------------------------------------------------------------------
-- Tabela item

DROP TABLE IF EXISTS item;

CREATE TABLE IF NOT EXISTS item (
  pk_item INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(120) NOT NULL,
  descricao VARCHAR(1000) NOT NULL,
  PRIMARY KEY (pk_item),
  UNIQUE INDEX titulo_UNICA (titulo ASC))
ENGINE = InnoDB;

-- -------------------------------------------------------------------------
-- Tabela subitem

DROP TABLE IF EXISTS subitem;

CREATE TABLE IF NOT EXISTS subitem (
  pk_subitem INT NOT NULL AUTO_INCREMENT,
  fk_item INT NOT NULL,
  titulo VARCHAR(120) NOT NULL,
  descricao VARCHAR(1000) NOT NULL,
  PRIMARY KEY (pk_subitem),
  INDEX fk_item_INDICE (fk_item ASC),
  CONSTRAINT fk_item_tabela_subitem
    FOREIGN KEY (fk_item)
    REFERENCES item (pk_item)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -------------------------------------------------------------------------
-- Dados da tabela item

START TRANSACTION;

USE banco_de_dados_demonstracao_de_slides;

INSERT INTO item (pk_item, titulo, descricao) VALUES (1, 'Cores', 'As cores são oriundas da percepção visual provocada pela ação de um dado feixe de fótons sobre células especializadas da retina. Em outras palavras, são as impressões que a luz, absorvida ou refletida por corpos, produz nos nossos olhos. Azul, verde e ciano são consideradas cores frias, enquanto amarelo, magenta e vermelho são consideradas cores quentes. Quando se trata de pigmentos, as cores primárias são: Amarelo, azul e vermelho, pois ao se combinarem formam outros pigmentos. Já quando se trata de luz, as cores primárias são: azul, verde e vermelho.');
INSERT INTO item (pk_item, titulo, descricao) VALUES (2, 'Frutas', 'É uma forma de denominar um grupo de alimentos sob um conceito puramente culinário. É dito popularmente que um fruto doce e comestível é uma fruta, mas o tomate por exemplo não foi considerado como sendo uma fruta. Exemplos de frutas: Maçã, abacaxi, banana, pera, melão, melancia, limão, laranja, jabuticaba e uva.');
INSERT INTO item (pk_item, titulo, descricao) VALUES (3, 'Ferramentas', 'São objetos utilizados para realizar trabalhos específicos. Podem ser instrumentos, utensílios, dispositivos, mecanismos intelectuais ou físicos utilizados por um ser vivo para realizar alguma tarefa.');
INSERT INTO item (pk_item, titulo, descricao) VALUES (4, 'Veículos', 'São mecanismos utilizados para transportar seres e objetos de um local para outro. Há várias formas de classificar os veículos, seja pelo que se propõe transportar, seja pelo meio em que trafega, seja pelo seu mecanismo de funcionamento e entre outras.');
INSERT INTO item (pk_item, titulo, descricao) VALUES (5, 'Verduras e legumes', 'Verduras são plantas comestíveis nas formas de brotos, flores, hastes e folhas. Já os legumes são as plantas comestíveis nas formas de caules, raízes, sementes e frutos com baixo teor de açúcar. Exemplos de verduras: Alface, brócolis e repolho. Exemplos de legumes: Arroz, batata e feijão.');
INSERT INTO item (pk_item, titulo, descricao) VALUES (6, 'Animais', 'São os seres vivos do reino Animalia. Possuem, entre outras, as seguintes características: Células com núcleo diferenciado, necessidade de ingerir seres vivos e corpo composto por mais do que uma célula. Os principais grupos de animais são: cordados, artrópodes, moluscos, equinodermos, anelídeos, nematelmintos, platelmintos, cnidários e poríferos.');
INSERT INTO item (pk_item, titulo, descricao) VALUES (7, 'Roupas', 'Tecidos usados para cobrir partes do corpo, roupa é sinônimo de indumentária, traje, veste e vestimenta. As roupas são usadas pelas pessoas por diversos motivos, alguns deles são: Necessidade, questões culturais e questões sociais. A variedade de roupas também se dá por diversas razões, como por exemplo: Status social, conforto, melhor utilidade devido ao clima, gosto pessoal e identificação (uniformes).');
INSERT INTO item (pk_item, titulo, descricao) VALUES (8, 'Formas geométricas', 'São os formatos dos objetos, podem ser classificadas em planas e não-planas. As planas não possuem volume, enquanto as não-planas possuem. As formas geométricas planas podem ser polígonos caso sejam formas fechadas, possuam segmentos de reta que não se cruzam e permaneçam com sua parte interna intacta. As formas geométricas não-planas também são chamadas de sólidos geométricos e possuem largura, altura e profundidade.');

COMMIT;

-- -------------------------------------------------------------------------
-- Dados da tabela subitem

START TRANSACTION;

USE banco_de_dados_demonstracao_de_slides;

INSERT INTO subitem (pk_subitem, fk_item, titulo, descricao) VALUES
(1, 1, 'Verde', 'É uma cor-luz primária e uma cor-pigmento secundária. Seu comprimento de onda é aproximadamente de 510 nm.'),
(2, 1, 'Azul', 'É uma cor-luz primária e uma cor-pigmento primária. Seu comprimento de onda é em torno de 460 nm.'),
(3, 1, 'Vermelho', 'É uma cor-luz primária e uma cor-pigmento primária. Seu comprimento de onda é em torno de 660 nm.'),
(4, 1, 'Amarelo', 'É uma cor-luz secundária e uma cor-pigmento primária. Seu comprimento de onda é entre 570 nm a 590 nm.'),
(5, 1, 'Preto', 'É a cor que absorve toda a luz e por isso materiais desta cor são mais quentes. É o oposto do branco.'),
(6, 1, 'Branco', 'É a cor que reflete toda a luz e por isso materiais desta cor são menos quentes. É o oposto do preto.'),
(7, 2, 'Abacaxi', 'Possui uma casca áspera e espinhosa. Sua polpa é amarelada ou esbranquiçada e seu sabor é ácido e doce.'),
(8, 2, 'Goiaba', 'Geralmente sua casca é verde ou amarela e sua polpa é rosada ou branca. É de baixo índice glicêmico.'),
(9, 2, 'Maracujá', 'O tipo mais comum possui uma casca amarela, grossa e enrugada. Seu sabor é azedo e possui efeito calmante.'),
(10, 2, 'Caju', 'De casca fina e delicada, sua cor varia entre laranja, amarelo e vermelho. O sabor da polpa é ácido e doce.'),
(11, 2, 'Jabuticaba', 'Também é chamada de jaboticaba e geralmente possui casca escura. Tem formato arredondado e sabor doce.'),
(12, 2, 'Cupuaçu', 'Com formato esférico ou ovoide e de casca castanho-escura, sua polpa tem um sabor forte e marcante.'),
(13, 3, 'Chave de fenda', 'Muito utilizada para montar móveis. Serve para parafusos que possuem uma fenda reta.'),
(14, 3, 'Chave inglesa', 'Considerada sendo uma chave multifunção, é ajustável para parafusos e porcas de tamanhos diferentes.'),
(15, 3, 'Chave phillips', 'Possui uma ponta fina e em formato de cone, deve ser utilizada em parafusos em formato de "xis".'),
(16, 3, 'Martelo', 'Serve para converter o trabalho mecânico em energia cinética e pressão, é geralmente usado para colocar pregos.'),
(17, 3, 'Alicate', 'É uma ferramenta indispensável, sendo o modelo universal capaz não só de apertar mas também de cortar.'),
(18, 4, 'Terrestre', 'Todo o veículo que trafega em vias terrestres, exemplos: carros, caminhões, tratores, escavadeiras e motocicletas.'),
(19, 4, 'Aquático', 'São os veículos que se movem por rios, lagos e mares. Exemplos: barcos, lanchas, navios e submarinos.'),
(20, 4, 'Aéreo', 'Todo o veículo que trafega pelo ar, exemplos: balões, dirigíveis, helicópteros, aviões e drones.'),
(21, 4, 'Anfíbio', 'São os veículos que se deslocam tanto por terra quanto por água (mar, rio e lago). BTR-80 é um exemplo.'),
(22, 5, 'Brócolis', 'Pertencente à família Brassicácea, esse vegetal ao ser consumido fortalece o sistema imunológico.'),
(23, 5, 'Couve-flor', 'Possui propriedades anti-inflamatórias e se for consumido regularmente fará bem ao coração.'),
(24, 5, 'Repolho', 'Vegetal que além de ser anti-inflamatório, melhora também a digestão por ter fibras solúveis.'),
(25, 5, 'Cenoura', 'Pode ser encontrada com diversas cores. A mais comum, laranja, é rica em α-caroteno e β-caroteno.'),
(26, 5, 'Feijão Fradinho', 'Possui elevado valor nutritivo e é um dos ingredientes do acarajé. O feijão-de-corda é um tipo de feijão fradinho.'),
(27, 6, 'Cachorro', 'É um animal doméstico que possui ótimo olfato e ótima audição. Mamífero canídeo.'),
(28, 6, 'Gato', 'É um mamífero que possui ótima visão noturna e excelente audição na escala de alta frequência.'),
(29, 6, 'Coelho', 'Mamífero de cauda curta e orelhas e patas compridas, cujo comportamento é dócil, manso e carinhoso.'),
(30, 6, 'Elefante', 'Atualmente o maior animal terrestre da atualidade. É um mamífero herbívoro que possui uma tromba.'),
(31, 7, 'Feminina', 'Roupa produzida com o intuito de ser utilizada por pessoas do sexo feminino (moças, garotas, etc).'),
(32, 7, 'Masculina', 'Roupa produzida com o intuito de ser utilizada por pessoas do sexo masculino (rapazes, garotos, etc).'),
(33, 7, 'Unissex', 'Roupa produzida com o intuito de ser utilizada por alguma pessoa independentemente de seu sexo.'),
(34, 8, 'Círculo', 'Forma não poligonal formada por uma superfície plana limitada por uma circunferência, linha curva.'),
(35, 8, 'Triângulo', 'Forma poligonal que possui três lados, três vértices e três ângulos formados.'),
(36, 8, 'Quadrilátero', 'Forma poligonal que possui quatro lados, quatro vértices e quatro ângulos formados.'),
(37, 8, 'Pentágono', 'Forma poligonal que possui cinco lados, cinco vértices e cinco ângulos formados.'),
(38, 8, 'Hexágono', 'Forma poligonal que possui seis lados, seis vértices e seis ângulos formados.'),
(39, 8, 'Heptágono', 'Forma poligonal que possui sete lados, sete vértices e sete ângulos formados.'),
(40, 8, 'Octógono', 'Forma poligonal que possui oito lados, oito vértices e oito ângulos formados.'),
(41, 8, 'Eneágono', 'Forma poligonal que possui nove lados, nove vértices e nove ângulos formados.'),
(42, 8, 'Esfera', 'É um sólido geométrico redondo que pode ser formado pela rotação de um semicírculo.'),
(43, 8, 'Cone', 'É um sólido geométrico formado pela união de um círculo, a base, com um ponto externo ao círculo.'),
(44, 8, 'Cilindro', 'É um sólido geométrico que possui duas bases, ambas são círculos, e uma lateral.'),
(45, 8, 'Cubo', 'É um sólido geométrico formado por seis quadrados congruentes, exemplo: dado de seis faces.'),
(46, 8, 'Pirâmide', 'É um sólido geométrico cuja única base é um polígono. Possui apenas mais um vértice além dos vértices da base.');

COMMIT;
