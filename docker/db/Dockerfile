FROM postgres:14

# Update and install the pg_cron extension
RUN apt-get update && apt-get install -y postgresql-14-cron

RUN echo "shared_preload_libraries='pg_cron'" >> /usr/share/postgresql/postgresql.conf.sample
RUN echo "cron.database_name='connext'" >> /usr/share/postgresql/postgresql.conf.sample