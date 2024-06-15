const userInput = document.querySelector("input");
const RNA = document.querySelector("#rna");
const codon = document.querySelector("#codon");
const aminoAcid = document.querySelector("#amino-acid");
const protein = document.querySelector("#protein");
const form = document.querySelector("form");
const footer = document.querySelector("footer");

const CODONRNA = {UUU: "Phe", UUC: "Phe", UUA: "Leu", UUG: "Leu", CUU: "Leu", CUC: "Leu", CUA: "Leu", CUG: "Leu", AUU: "Ile", AUC: "Ile", AUA: "Ile", AUG: "Met", GUU: "Val", GUC: "Val", GUA: "Val", GUG: "Val", UCU: "Ser", UCC: "Ser", UCA: "Ser", UCG: "Ser", CCU: "Pro", CCC: "Pro", CCA: "Pro", CCG: "Pro", ACU: "Thr", ACC: "Thr", ACA: "Thr", ACG: "Thr", GCU: "Ala", GCC: "Ala", GCA: "Ala", GCG: "Ala", UAU: "Tyr", UAC: "Tyr", UAA: "Stop", UAG: "Stop", CAU: "His", CAC: "His", CAA: "Gln", CAG: "Gln", AAU: "Asn", AAC: "Asn", AAA: "Lys", AAG: "Lys", GAU: "Asp", GAC: "Asp", GAA: "Glu", GAG: "Glu", UGU: "Cys", UGC: "Cys", UGA: "Stop", UGG: "Trp", CGU: "Arg", CGC: "Arg", CGA: "Arg", CGG: "Arg", AGU: "Ser", AGC: "Ser", AGA: "Arg", AGG: "Arg", GGU: "Gly", GGC: "Gly", GGA: "Gly", GGG: "Gly"};

let DNAVal, RNAVal = [], aminos, proteins = [], codons;



const transcript = function() {
    let index = 0;
    for(const char of DNAVal) {
        if(char === "A") {
            RNAVal[index] = "U";
        } else if(char === "T") {
            RNAVal[index] = "A";
        } else if(char === "G") {
            RNAVal[index] = "C";
        } else if(char === "C") {
            RNAVal[index] = "G";
        } else {
            RNA.textContent = "RNA: INVALID VALUE";
            return 1;
        }
        index++;
        RNA.textContent = `mRNA: ${RNAVal.join("")}`;
    }
}


const getCodon = function(c) {
    codons = c;
    codon.textContent = `코돈: ${codons}`;
    for(const val in CODONRNA) {
        if(codons === val) {
            aminos = CODONRNA[val];
            aminoAcid.textContent = `아미노산: ${CODONRNA[val]}`;
        }
    }
}

const translation = function() {
    let isStart = false, isEnd = false, sIndex, eIndex;
    for(let k = 2; k < RNAVal.length; k++) {
        getCodon(RNAVal[k - 2] + RNAVal[k - 1] + RNAVal[k]);
        if(aminos === "Met"&&!isStart) {
            isStart = true;
            sIndex = k;
            for(let h = k; h < RNAVal.length; h += 3) {
                getCodon(RNAVal[h - 2] + RNAVal[h - 1] + RNAVal[h]);
                if(aminos === "Stop" && !isEnd) {
                    isEnd = true;
                    eIndex = h;
                }
            }
        }
    }

    if(!isStart) {
        protein.textContent = "단백질: THERE IS NO START";
        return;
    } else if(!isEnd) {
        protein.textContent = "단백질: THERE IS NO END";
        return;
    }

    for(let j = sIndex; j < eIndex; j += 3) {
        getCodon(RNAVal[j - 2] + RNAVal[j - 1] + RNAVal[j])
        proteins.push(aminos);
        protein.textContent = `단백질: ${proteins.toString()}`;
    }
}

const takeDNA = function(event) {
    event.preventDefault();
    DNAVal = userInput.value;
    let k = 2;
    transcript();
    if(transcript() === 1) {
        return;
    }
    translation();
    }

form.addEventListener("submit", takeDNA);
footer.addEventListener("click", () => {
    window.location.reload();
});

const checkCopy = function(toC, t) {
    if(!toC) {
        alert(`${t} value is invalid. You can't copy it.`);
    }
}

RNA.addEventListener("click", () => {
    checkCopy(RNAVal.join(""), "RNA");
    navigator.clipboard.writeText(RNAVal.join("")).catch((r) => {alert(r);});
})

codon.addEventListener("click", () => {
    checkCopy(codons, "CODON");
    navigator.clipboard.writeText(codons).catch((r) => {alert(r);});
})

aminoAcid.addEventListener("click", () => {
    checkCopy(aminos, "AMINO ACID");
    navigator.clipboard.writeText(aminos).catch((r) => {alert(r);});
})

protein.addEventListener("click", () => {
    checkCopy(proteins.toString(), "PROTEIN");
    navigator.clipboard.writeText(proteins.toString()).catch((r) => {alert(r);});
})
