from locust import HttpUser, task, between

class WebUser(HttpUser):
    wait_time = between(1, 3) # tempo de espera entre as requisições em segundos

    @task
    def index(self):
        self.client.get("/jogo_da_velha") # faz uma requisição GET para a página inicial do seu servidor

    # @task
    # def about(self):
    #     self.client.get("/about") # faz uma requisição GET para a página sobre do seu servidor
