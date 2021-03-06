/*
 * Patch pour le chargement de l'autoconf avec l'API géoportail dépréciée
 * Licence : BSD 3-Clause License
 */
Geoportal.Catalogue.oldCompleteConfiguration = Geoportal.Catalogue.completeConfiguration;
Geoportal.Catalogue.completeConfiguration= function(configuration){
    var general= configuration.generalOptions;
    var resolutions =  [559082264.0287179, 279541132.0143589, 139770566.0071794, 69885283.00358972, 34942641.50179486, 17471320.75089743, 8735660.375448715, 4367830.1877243575, 2183915.0938621787, 1091957.5469310887, 545978.7734655447, 272989.3867327723, 136494.69336638617, 68247.34668319307, 34123.67334159654, 17061.83667079827, 8530.918335399136, 4265.459167699568, 2132.729583849784, 1066.3647919248917, 533.1823959624461, 266.5911979812229, 266.5911979812229/2];
    for ( var name in general.tileMatrixSets ){
        var tileMatrixSet = general.tileMatrixSets[name];
        tileMatrixSet.supportedCRS = tileMatrixSet.supportedCRS || 'EPSG:3857';

        var matrixIds= tileMatrixSet.matrixIds;
        for (var i= 0, li= matrixIds.length; i<li; ++i) {
            var mid= matrixIds[i];
            mid.supportedCRS = mid.supportedCRS || 'EPSG:3857';
            mid.identifier = resolutions.indexOf(mid.scaleDenominator);
        }
    }
    if ( general.tileMatrixSets['undefined'] ){
        general.tileMatrixSets['PM'] = general.tileMatrixSets['undefined'];
        delete general.tileMatrixSets['undefined'];
    }
    return Geoportal.Catalogue.oldCompleteConfiguration(configuration);
};

/*
 * Patch réglant le problème de changement de http vers https de certains namespaces
 */
const originalParseAutoConf = Geoportal.GeoRMHandler.parseAutoConf;
Geoportal.GeoRMHandler.parseAutoConf = function (keys, aggregateUrl, callback, resp) {
  try {
    resp.data.xml = resp.data.xml.replace(/="https/g, '="http');
  } catch (e) {
    console.error(e);
  }
  return originalParseAutoConf(keys, aggregateUrl, callback, resp);
};
