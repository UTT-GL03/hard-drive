/** SOURCE : https://github.com/cnumr/GreenIT-Analysis/blob/acc0334c712ba68939466c42af1514b5f448e19f/script/ecoIndex.js#L19-L44 */

let quantiles_dom = [0, 47, 75, 159, 233, 298, 358, 417, 476, 537, 603, 674, 753, 843, 949, 1076, 1237, 1459, 1801, 2479, 594601];
let quantiles_req = [0, 2, 15, 25, 34, 42, 49, 56, 63, 70, 78, 86, 95, 105, 117, 130, 147, 170, 205, 281, 3920];
let quantiles_size = [0, 1.37, 144.7, 319.53, 479.46, 631.97, 783.38, 937.91, 1098.62, 1265.47, 1448.32, 1648.27, 1876.08, 2142.06, 2465.37, 2866.31, 3401.59, 4155.73, 5400.08, 8037.54, 223212.26];


/**
Calcul ecoIndex based on formula from web site www.ecoindex.fr
**/
function computeEcoIndex(dom,req,size)
{

const q_dom= computeQuantile(quantiles_dom,dom);
const q_req= computeQuantile(quantiles_req,req);
const q_size= computeQuantile(quantiles_size,size);

return 100 - 5 * (3*q_dom + 2*q_req + q_size)/6;
}

function computeQuantile(quantiles,value)
{
for (let i=1;i<quantiles.length;i++)
	{
	if (value<quantiles[i]) return (i -1 + (value-quantiles[i-1])/(quantiles[i] -quantiles[i-1]));
	}
return quantiles.length -1;
}


function getEcoIndexGrade(ecoIndex)
{
if (ecoIndex > 80) return "A";
if (ecoIndex > 70) return "B";
if (ecoIndex > 55) return "C";
if (ecoIndex > 40) return "D";
if (ecoIndex > 25) return "E";
if (ecoIndex > 10) return "F";
return "G";
}


/** update dom, req and size with actual value */

const execute = () => {

    const args = process.argv.slice(2);

    if (args.length < 3) {
        console.error("❌ Utilisation : node ecoindex.js <req> <size> <dom>");
        process.exit(1);
    }

    const req = parseFloat(args[0]);
    const size = parseFloat(args[1]);
    const dom = parseFloat(args[2]);

    const ecoIndex = computeEcoIndex(dom, req, size);
    const grade = getEcoIndexGrade(ecoIndex);

    console.log(`DOM: ${dom}, REQ: ${req}, SIZE: ${size}`);
    console.log(`EcoIndex: ${ecoIndex.toFixed(2)}, Grade: ${grade}`);
};


execute();