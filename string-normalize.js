/**
 * Returns the string with accented and non-standard Latin-based characters converted into ASCII approximate equivalents.
 *
 * @returns {String}
 */
String.prototype.normalize = function() {
    var NormalizeSource = {
        'A':  /[AⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ]/g,
        'B':  /[BⒷＢḂḄḆɃƂƁ]/g,
        'C':  /[CⒸＣĆĈĊČÇḈƇȻꜾ]/g,
        'D':  /[DⒹＤḊĎḌḐḒḎĐƋƊƉꝹ]/g,
        'E':  /[EⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎ]/g,
        'F':  /[FⒻＦḞƑꝻ]/g,
        'G':  /[GⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾ]/g,
        'H':  /[HⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ]/g,
        'I':  /[IⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ]/g,
        'J':  /[JⒿＪĴɈ]/g,
        'K':  /[KⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ]/g,
        'L':  /[LⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀ]/g,
        'M':  /[MⓂＭḾṀṂⱮƜ]/g,
        'N':  /[NⓃＮǸŃÑṄŇṆŅṊṈȠƝꞐꞤ]/g,
        'O':  /[OⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ]/g,
        'P':  /[PⓅＰṔṖƤⱣꝐꝒꝔ]/g,
        'Q':  /[QⓆＱꝖꝘɊ]/g,
        'R':  /[RⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ]/g,
        'S':  /[SⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ]/g,
        'T':  /[TⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ]/g,
        'U':  /[UⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ]/g,
        'V':  /[VⓋＶṼṾƲꝞɅ]/g,
        'W':  /[WⓌＷẀẂŴẆẄẈⱲ]/g,
        'X':  /[XⓍＸẊẌ]/g,
        'Y':  /[YⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ]/g,
        'Z':  /[ZⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ]/g,
        'a':  /[aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐ]/g,
        'b':  /[bⓑｂḃḅḇƀƃɓ]/g,
        'c':  /[cⓒｃćĉċčçḉƈȼꜿↄ]/g,
        'd':  /[dⓓｄḋďḍḑḓḏđƌɖɗꝺ]/g,
        'e':  /[eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ]/g,
        'f':  /[fⓕｆḟƒꝼ]/g,
        'g':  /[gⓖｇǵĝḡğġǧģǥɠꞡᵹꝿ]/g,
        'h':  /[hⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ]/g,
        'i':  /[iⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı]/g,
        'j':  /[jⓙｊĵǰɉ]/g,
        'k':  /[kⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ]/g,
        'l':  /[lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇ]/g,
        'm':  /[mⓜｍḿṁṃɱɯ]/g,
        'n':  /[nⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ]/g,
        'o':  /[oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔꝋꝍɵ]/g,
        'p':  /[pⓟｐṕṗƥᵽꝑꝓꝕ]/g,
        'q':  /[qⓠｑɋꝗꝙ]/g,
        'r':  /[rⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ]/g,
        's':  /[sⓢｓśṥŝṡšṧṣṩșşȿꞩꞅẛ]/g,
        't':  /[tⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ]/g,
        'u':  /[uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ]/g,
        'v':  /[vⓥｖṽṿʋꝟʌ]/g,
        'w':  /[wⓦｗẁẃŵẇẅẘẉⱳ]/g,
        'x':  /[xⓧｘẋẍ]/g,
        'y':  /[yⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ]/g,
        'z':  /[zⓩｚźẑżžẓẕƶȥɀⱬꝣ]/g,
        'AA': /[Ꜳ]/g,
        'AE': /[ÆǼǢ]/g,
        'AO': /[Ꜵ]/g,
        'AU': /[Ꜷ]/g,
        'AV': /[ꜸꜺ]/g,
        'AY': /[Ꜽ]/g,
        'DZ': /[ǱǄ]/g,
        'Dz': /[ǲǅ]/g,
        'LJ': /[Ǉ]/g,
        'Lj': /[ǈ]/g,
        'NJ': /[Ǌ]/g,
        'Nj': /[ǋ]/g,
        'OI': /[Ƣ]/g,
        'OO': /[Ꝏ]/g,
        'OU': /[Ȣ]/g,
        'TZ': /[Ꜩ]/g,
        'VY': /[Ꝡ]/g,
        'aa': /[ꜳ]/g,
        'ae': /[æǽǣ]/g,
        'ao': /[ꜵ]/g,
        'au': /[ꜷ]/g,
        'av': /[ꜹꜻ]/g,
        'ay': /[ꜽ]/g,
        'dz': /[ǳǆ]/g,
        'hv': /[ƕ]/g,
        'lj': /[ǉ]/g,
        'nj': /[ǌ]/g,
        'oi': /[ƣ]/g,
        'ou': /[ȣ]/g,
        'oo': /[ꝏ]/g,
        'ss': /[ß]/g,
        'tz': /[ꜩ]/g,
        'vy': /[ꝡ]/g
    };
 
    var value = this;
 
    for (var normalized in NormalizeSource) {
        var regexp = NormalizeSource[normalized];
        value = value.replace(regexp, normalized);
    }
 
    return value;
}