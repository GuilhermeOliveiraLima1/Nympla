create table users (
	id serial primary key,
	name varchar,
	email varchar unique,
	password varchar not null,
	birth date,
	role varchar
);

insert into users(name, email, password, birth, role)
values('Luciana', 'luciana@gmail.com', '123', '12-03-1990', 'user');

insert into users(name, email, password, birth, role)
values('Junior', 'junior@gmail.com', '456', '12-03-1990', 'user');

select * from users;