/*
 * Tentative patch/diagnostique chargement autoconf avec l'API géoportail dépréciée
 *
 * Remarque : debug basé sur https://github.com/opalesurfcasting/api-geoportail-v2
 * inclure api-geoportail-v2/lib/geoportal/lib/Geoportal.js
 *
 */
Geoportal.Catalogue.oldCompleteConfiguration = Geoportal.Catalogue.completeConfiguration;
Geoportal.Catalogue.completeConfiguration= function(configuration){
    var general= configuration.generalOptions;
    for ( var name in general.tileMatrixSets ){
        var tileMatrixSet = general.tileMatrixSets[name];
        tileMatrixSet.supportedCRS = tileMatrixSet.supportedCRS || 'EPSG:3857';

        var matrixIds= tileMatrixSet.matrixIds;
        for (var i= 0, li= matrixIds.length; i<li; ++i) {
            var mid= matrixIds[i];
            mid.supportedCRS = mid.supportedCRS || 'EPSG:3857';
        }
    }
    if ( general.tileMatrixSets['undefined'] ){
        general.tileMatrixSets['PM'] = general.tileMatrixSets['undefined'];
    }
    return Geoportal.Catalogue.oldCompleteConfiguration(configuration);
};

