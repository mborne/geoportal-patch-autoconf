# geoportal-patch-autoconf

## Problème

Une erreur `TypeError: B.supportedCRS is undefined` apparait au chargement de l'autoconf à l'appel de `Geoportal.load` de l'ancienne API géoportail.

Les données semblent pourtant être présentes dans l'autoconf :

http://wxs.ign.fr/API_KEY/autoconf/?output=xml

```xml
<wmts:TileMatrixSet>
    <ows:Identifier>PM</ows:Identifier>
    <ows:SupportedCRS>EPSG:3857</ows:SupportedCRS>
    <wmts:TileMatrix>
        <ows:Identifier>0</ows:Identifier>
        <wmts:ScaleDenominator>559082264.0287178958533332</wmts:ScaleDenominator>
        <wmts:TopLeftCorner>-20037508 20037508</wmts:TopLeftCorner>
        <wmts:TileWidth>256</wmts:TileWidth>
        <wmts:TileHeight>256</wmts:TileHeight>
        <wmts:MatrixWidth>1</wmts:MatrixWidth>
        <wmts:MatrixHeight>1</wmts:MatrixHeight>
    </wmts:TileMatrix>
    <!-- ... -->
</wmts:TileMatrixSet>
```

## Patch de dépannage

Voir [geoportal-patch-autoconf.js](geoportal-patch-autoconf.js)

```html
<script type="text/javascript" src="https://api.ign.fr/geoportail/api/js/2.1.2/Geoportal.js"></script>
<script type="text/javascript" src="geoportal-patch-autoconf.js"></script>
```

## Origine du problème

Il semble que le problème soit dans la lecture de tous les éléments du namespace ows :

* ows:Identifier ('PM' et '0', '1', etc.)
* ows:SupportedCRS ('EPSG:3857')



