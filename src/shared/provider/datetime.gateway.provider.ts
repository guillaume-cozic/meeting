import { TestDateTimeGateway } from "./../../../test/adapters/test.datetime.gateway";
import { DATE_TIME_GATEWAY } from "../datetime.gateway";
import { ProdDateTimeGateway } from "../prod.datetime.gateway";

export const DateTimeGatewayProvider = {
    provide: DATE_TIME_GATEWAY,
    useClass:
      process.env.NODE_ENV === 'development'
        ? TestDateTimeGateway
        : TestDateTimeGateway,
  };