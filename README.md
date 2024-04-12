# Interactive Modern Portfolio Theory Simulator

## Description
The Interactive Modern Portfolio Theory Simulator is a web-based application that allows users to visualize and interact with financial data, applying principles of Modern Portfolio Theory for portfolio optimization. It features an interactive scatter plot that represents stocks from the S&P 500 index and allows users to explore the impact of different stock combinations on portfolio return and volatility. It is mainly a platform to learn the basics on portfolio risk and return using Markowitz's Modern Portfolio Theory.

## Data Files
The simulator utilizes two key CSV files, which are updated as of March 2024:
- `sp_500_clustering.csv`: Contains the clustering information of the S&P 500 stocks used in the stocks scatter plot.
- `sp_500_stocks.csv`: Includes detailed historic stock daily return data.

These files should be placed in the same directory as your HTML, CSS, and JavaScript files.

## Installation

Follow these steps to set up the in your local machine:

1. Clone or download this repository to your local machine.
2. Ensure that you have a modern web browser installed to run the application.

No further installation is required, as the application leverages CDN-hosted D3.js and Simple Statistics libraries.

Otherwise, you can run it in your browser by just opening this link: 'https://gabrielesansonc.github.io/ModernPortfolioTheoryViz'

## Usage

1. Open the `https://gabrielesansonc.github.io/ModernPortfolioTheoryViz` file in a web browser to launch the website.
2. Use the scatter plot to select stocks and experiment with different investment strategies.
3. Observe the dynamic updates in the portfolio's projected return and volatility as you make selections.
4. Click the "Record Point" button to save the current state of your portfolio and update the scatter plot with new data based on the portfolio you just created.
5. Keep recording more and more created portfolios and you will see the 'Effective Frontier' form, effective stocks will be colored blue, non-effective will be colored red.


## Contact

If you have any questions, suggestions, or comments, please reach out to us at gabrielesansonc@gmail.com.
