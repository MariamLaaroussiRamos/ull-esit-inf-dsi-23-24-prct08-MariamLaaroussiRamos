import "mocha";
import { expect } from "chai";
import { NewsFeed, Observer } from "../src/ejercicio-1-pe";

describe("NewsFeed tests", () => {
    let newsFeed: NewsFeed;
    let observer1ReceivedNews: string | undefined;
    let observer2ReceivedNews: string | undefined;

    const observer1: Observer = {
        update: (news: string) => { observer1ReceivedNews = news; }
    };

    const observer2: Observer = {
        update: (news: string) => { observer2ReceivedNews = news; }
    };

    beforeEach(() => {
        newsFeed = new NewsFeed(1, "Noticias DSI");
        observer1ReceivedNews = undefined;
        observer2ReceivedNews = undefined;
    });

    it("debes suscribirte y notificar a los oberservers", () => {
        newsFeed.subscribe(observer1);
        newsFeed.subscribe(observer2);

        newsFeed.notify("Nueva noticia publicada");

        expect(observer1ReceivedNews).to.equal("Nueva noticia publicada");
        expect(observer2ReceivedNews).to.equal("Nueva noticia publicada");
    });

    it("debes desuscribirte de un oberserver", () => {
        newsFeed.subscribe(observer1);
        newsFeed.unsubscribe(observer1);

        newsFeed.notify("Hay una actualización");

        expect(observer1ReceivedNews).to.be.undefined;
    });

    it("Debe de lanzar un error cuando se intente suscribir a un observer mas de una vez", () => {
        newsFeed.subscribe(observer1);

        expect(() => newsFeed.subscribe(observer1)).to.throw('El observador ya se ha suscrito');
    });

    it("Debe de lanzar un error cuando se trata de desuscribir a un observador que no se ha suscrito", () => {
        const observer3: Observer = {
            update: (news: string) => {}
        };

        expect(() => newsFeed.unsubscribe(observer3)).to.throw('El observador no se ha suscrito');
    });
});