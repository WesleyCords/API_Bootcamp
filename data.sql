INSERT INTO usuarios (nome, email, senha_hash, created_at, updated_at)
    VALUES
    ('João Souza', 'joao@example.com', '$2a$10$abc...', '2025-07-16 10:00:00', '2025-07-16 10:00:00'),
    ('Maria Silva', 'maria@example.com', '$2a$10$def...', '2025-07-16 10:05:00', '2025-07-16 10:05:00');


INSERT INTO salas (nome, descricao, capacidade, recursos, created_at, updated_at)
    VALUES
    ('Sala 101', 'Sala de estudo coletiva', 6, 'TV e Ar condicionado', '2025-07-16 10:10:00', '2025-07-16 10:10:00'),
    ('Sala de Reunião', 'Sala para reuniões', 10, 'Projetor e Ar condicionado', '2025-07-16 10:12:00', '2025-07-16 10:12:00');


INSERT INTO horarios (sala_id, inicio, fim, created_at, updated_at)
    VALUES
    (1, '08:00', '12:00', '2025-07-16 10:15:00', '2025-07-16 10:15:00'),
    (1, '14:00', '18:00', '2025-07-16 10:16:00', '2025-07-16 10:16:00'),
    ( 2, '09:00', '10:00', '2025-07-16 10:17:00', '2025-07-16 10:17:00'),
    ( 2, '10:00', '11:00', '2025-07-16 10:17:00', '2025-07-16 10:17:00'),
    ( 2, '11:00', '12:00', '2025-07-16 10:17:00', '2025-07-16 10:17:00');


INSERT INTO reservas (usuario_id, sala_id, horario_id, data, created_at, updated_at)
    VALUES
    ( 1, 1, 1, '2025-07-18', '2025-07-16 10:20:00', '2025-07-16 10:20:00'),
    ( 2, 2, 3, '2025-07-19', '2025-07-16 10:25:00', '2025-07-16 10:25:00'),
    ( 2, 2, 4, '2025-07-19', '2025-07-16 10:25:00', '2025-07-16 10:25:00');

