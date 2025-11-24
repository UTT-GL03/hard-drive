const visit = async (page) => {
  await page.goto('00000000-0000-0000-0000-000000000000', {
      waitUntil: 'networkidle',
  });
  await page.waitForTimeout(10000);
  await page.scrollToEnd();
  await page.waitForNetworkIdle();
  await page.waitForTimeout(7000);
};

module.exports = visit;