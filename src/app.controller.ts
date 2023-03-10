import { Controller, Get, Query, Render, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  /**
   * List of stocks to display in the sidebar of the web page.
   */
  stocks = ['AAPL', 'GOOG'];

  /**
   * Constructs a new instance of the AppController and passes in the IEX Cloud Service object.
   * @param iexCloudService The IEX Cloud Service to use to retrieve financial data.
   */
  constructor() {}

  /**
   * Renders the home page.
   * @returns Returns the list of stocks to display on the sidebar of the home page.
   */
  @Get()
  @Render('index')
  root() {
    return { stocks: this.stocks };
  }

  /**
   * Render the Add Stock form.
   * @returns Nothing.
   */
  @Get('add')
  @Render('add')
  add() {
    return;
  }

  /**
   * Saves the new stock symbol and redirects the user to the details page for the newly created stock.
   * @param stockSymbol The new stock symbol that should be added.
   * @param res The response object, used to redirect to the new stock details page.
   * @returns The page redirect.
   */
  @Get('add/save')
  addSave(@Query('symbol') stockSymbol: string, @Res() res: Response) {
    this.stocks.push(stockSymbol);

    return res.redirect('/');
  }

  /**
   * Renders the stock details page which includes company information and historical data.
   * @param stockSymbol The stock symbol to render the details page for.
   * @param range The date range to retrieve historical data for.
   * @returns All the company and historical data that should be shown on the details page.
   */
  @Get('detail/:symbol')
  @Render('detail')
  async detail() {}
}
